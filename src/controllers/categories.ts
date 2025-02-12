import { Request, Response, NextFunction } from 'express';
import Category from '@models/category';
import { ACTIVE, DELETED } from '@constants/status';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const payload = { name, description };
    const category = await new Category(payload).save();
    return res.status(200).send(category);
  } catch (error) {
    return next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id }, body: { name, description } } = req;
    const payload = { name, description };
    const category = await Category.findByIdAndUpdate(id, payload, { new: true });
    if (!category) return res.sendStatus(404);
    return res.status(200).send(category);
  } catch (error) {
    return next(error);
  }
};

export const softDeleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id } } = req;
    const category = await Category.findOneAndUpdate({ _id: id, status: ACTIVE }, { status: DELETED }, { new: true });
    if (!category) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

export const hardDeleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id } } = req;
    const deleteOne = await Category.findByIdAndDelete(id);
    if (!deleteOne) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    const filter = { status: ACTIVE };

    const count = await Category.countDocuments(filter);
    const categories = await Category.find(filter).skip(skip).limit(limitNum);
    return res.status(200).send({
      categories,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      count,
    });
  } catch (error) {
    return next(error);
  }
};

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ $and: [{ _id: id }, { status: ACTIVE }] });
    if (!category) return res.sendStatus(404);
    return res.status(200).send(category);
  } catch (error) {
    return next(error);
  }
};
