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

  if (!bike) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Bike not found! Please select another bike.'
    );
  }

  if (!bike.isAvailable) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This bike is already busy with another tourist. Choose another bike!'
    );
  }
  await User.isValidUser(id);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

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

  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const startTime = rental?.startTime.getTime();
  const returnTime = new Date().getTime();
  const hours = (returnTime - startTime) / (1000 * 60 * 60);
  const totalCost = parseFloat(
    (hours * rental?.bikeId.pricePerHour).toFixed(2)
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await Bike.findByIdAndUpdate(
      rental.bikeId,
      { isAvailable: true },
      { session }
    );

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
  await User.isValidUser(id);

  const result = await Rental.find({ userId: id });

  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

export { createRentalIntoDB, updateRentalIntoDB, getRentalFromDB };
