import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CreateCategoryDTO,UpdateCategoryDTO } from "./category.dto.js";
import { categoryService } from "../../../config/container.js";

export async function createCategory(
    req: Request<{}, {}, CreateCategoryDTO>,
    res: Response
): Promise<void> {

    const category = await categoryService.create(req.body);


    res.success({
        code: StatusCodes.CREATED,
        message: "Category created successfully",
        data: category
    });
}


export async function getCategories(
    _req: Request,
    res: Response
): Promise<void> {

    const categories = await categoryService.findAll();


    res.success({
        code: StatusCodes.OK,
        message: "Categories fetched successfully",
        data: categories
    });
}


export async function getCategoryById(
    req: Request<{ id: string }>,
    res: Response
): Promise<void> {

    const category = await categoryService.findById(req.params.id);


    res.success({
        code: StatusCodes.OK,
        message: "Category fetched successfully",
        data: category
    });
}


export async function updateCategory(
    req: Request<{ id: string }, {}, UpdateCategoryDTO>,
    res: Response
): Promise<void> {

    const category =await categoryService.update(
            req.params.id,
            req.body
        );


    res.success({
        code: StatusCodes.OK,
        message: "Category updated successfully",
        data: category
    });
}



export async function deleteCategory(
    req: Request<{ id: string }>,
    res: Response
): Promise<void> {

    const category = await categoryService.softDelete(req.params.id);


    res.success({
        code: StatusCodes.OK,
        message: "Category deleted successfully",
        data: category
    });
}