import { RouterContext } from "../deps.ts";
import bookRepository from "../repositories/BookRepository.ts";

class BookController {
  async index(context: RouterContext) {
    const books = await bookRepository.getAllBooks();
    context.response.headers.set("Content-Type", "application/json");
    context.response.status = 200;
    context.response.body = {
      status: true,
      message: "all books",
      data: books,
    };
  }

  async show(context: RouterContext) {
    const { id } = context.params;
    const book = await bookRepository.getBookById(parseInt(id!));
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: book };
  }

  async store(context: RouterContext) {
    const result = await context.request.body({
      contentTypes: { text: ["application/json"] },
    });
    const book = result.value;

    await bookRepository.createBook(book);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }

  async update(context: RouterContext) {
    const result = await context.request.body({
      contentTypes: { text: ["application/json"] },
    });
    const book = result.value;
    const { id } = context.params;
    await bookRepository.updateBook(parseInt(id!), book);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }

  async delete(context: RouterContext) {
    const { id } = context.params;
    await bookRepository.deleteBook(parseInt(id!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }
}
export default new BookController();
