import { Request, Response, NextFunction } from 'express';
import Product from '@models/product';
import { ACTIVE, DELETED } from '@constants/status';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name, description, price, quantity, category
    } = req.body;
    const payload = { name, description, price, quantity, category };
    const product = await new Product(payload).save();
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id }, body: { name, description, price, quantity, category } } = req;
    const payload = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(quantity && { quantity }),
      ...(category && { category })
    };
    const product = await Product.findByIdAndUpdate(id, payload, { new: true });
    if (!product) return res.sendStatus(404);
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}

export const softDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id } } = req;
    const product = await Product.findByIdAndUpdate(id, { status: DELETED }, { new: true });
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}

export const hardDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id } } = req;
    await Product.deleteOne({ _id: id });
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
}

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (error) {
    return next(error);
  }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ $and: [{ id }, { status: ACTIVE }] });
    if (!product) return res.sendStatus(404);
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}
