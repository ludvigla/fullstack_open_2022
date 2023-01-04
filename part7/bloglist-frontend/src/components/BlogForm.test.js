import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("form calls event handler with correct details when a new blog post is created", async () => {
    // Mock handler for createBlog
    const createBlog = jest.fn();
    render(<BlogForm createBlog={createBlog} />);

    // Fill in the form
    const title = screen.getByLabelText("title:");
    const author = screen.getByLabelText("author:");
    const url = screen.getByLabelText("url:");
    await userEvent.type(title, "My first blog post");
    await userEvent.type(author, "Jane Doe");
    await userEvent.type(url, "https://example.com/post1");
    const sendButton = screen.getByText("create");
    await userEvent.click(sendButton);

    // Check that the event handler is called with the correct details
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("My first blog post");
    expect(createBlog.mock.calls[0][0].author).toBe("Jane Doe");
    expect(createBlog.mock.calls[0][0].url).toBe("https://example.com/post1");
  });
});
