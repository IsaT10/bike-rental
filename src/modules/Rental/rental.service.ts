import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { TBike } from '../Bike/bike.interface';
import { Bike } from '../Bike/bike.model';
import { User } from '../User/user.model';
import { TRental } from './rental.interface';
import { Rental } from './rental.model';
import mongoose from 'mongoose';

const createRentalIntoDB = async (id: string, payload: Partial<TRental>) => {
  const bike = await Bike.findById(payload.bikeId);

  //check is bike exists
  if (!bike) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Bike not found! Please select another bike.'
    );
  }

  // check is bike available for rent
  if (!bike.isAvailable) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This bike is already busy with another tourist. Choose another bike!'
    );
  }

  //check user is valid or not
  await User.isValidUser(id);

  //start session for transaction rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // transaction-1
    const updateBikeStatus = await Bike.findByIdAndUpdate(
      payload.bikeId,
      {
        isAvailable: false,
      },
      { session }
    );

    if (!updateBikeStatus) {
      throw new AppError(httpStatus.NOT_FOUND, 'Can not update bike status!');
    }

    //transaction-2
    const result = await Rental.create([{ userId: id, ...payload }], {
      session,
    });

    await session.commitTransaction();
    await session.endSession();

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    if (error) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Can not create rental. Please try again later!'
      );
    }
  }
};

const updateRentalIntoDB = async (id: string) => {
  const rental = await Rental.findById(id).populate<{ bikeId: TBike }>(
    'bikeId'
  );

  //check rental is exists
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  //calculate total cost
  const startTime = rental?.startTime.getTime();
  const returnTime = new Date().getTime();
  const hours = (returnTime - startTime) / (1000 * 60 * 60);
  const totalCost = parseFloat(
    (hours * rental?.bikeId.pricePerHour).toFixed(2)
  );

  //start session for transaction & rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //transaction-1
    await Bike.findByIdAndUpdate(
      rental.bikeId,
      { isAvailable: true },
      { session }
    );

    //transaction-2
    const result = await Rental.findByIdAndUpdate(
      id,
      {
        totalCost,
        isReturned: true,
        returnTime,
      },
      { new: true, session }
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    if (error) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Can not update rental. Please try again later!'
      );
    }
  }
};

const getRentalFromDB = async (id: string) => {
  //check user is exists or not
  await User.isValidUser(id);

  const result = await Rental.find({ userId: id });

  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

export { createRentalIntoDB, updateRentalIntoDB, getRentalFromDB };
