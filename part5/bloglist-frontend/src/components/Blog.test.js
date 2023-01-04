import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("renders content", () => {
    const blog = {
      title: "Blog post",
      author: "John Doe",
      user: "63a58e20ba69481de60d6dc6",
    };

    const { container } = render(
      <Blog
        blog={blog}
        user={{}}
        prop={jest.fn()}
        removeBlog={jest.fn()}
        addLike={jest.fn()}
      />
    );

    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("Blog post John Doe");
  });

  test("at the start, extended info (url and likes) is not shown", () => {
    const blog = {
      title: "Blog post",
      author: "John Doe",
      user: "63a58e20ba69481de60d6dc6",
    };

    const { container } = render(
      <Blog
        blog={blog}
        user={{}}
        prop={jest.fn()}
        removeBlog={jest.fn()}
        addLike={jest.fn()}
      />
    );

    const div = container.querySelector(".extendedInfo");
    expect(div).toBeNull();
  });

  test("clicking the view button shows additional info", async () => {
    const blog = {
      title: "Blog post",
      author: "John Doe",
      url: "https://example.com",
      likes: 0,
      user: "63a58e20ba69481de60d6dc6",
    };

    render(
      <Blog
        blog={blog}
        user={{}}
        prop={jest.fn()}
        removeBlog={jest.fn()}
        addLike={jest.fn()}
      />
    );

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    // I figured it's enough to cheeck with getBByText if the text is shown
    screen.getByText("likes 0");
    screen.getByText("https://example.com");
  });

  test("clicking the like button twice calls event handler twice", async () => {
    const blog = {
      title: "Blog post",
      author: "John Doe",
      url: "https://example.com",
      likes: 0,
      user: "63a58e20ba69481de60d6dc6",
    };

    const mockHandler = jest.fn();

    render(
      <Blog
        blog={blog}
        user={{}}
        prop={jest.fn()}
        removeBlog={jest.fn()}
        addLike={mockHandler}
      />
    );

    const user = userEvent.setup();
    const button = screen.getByText("view");
    // Open extended info
    await user.click(button);
    const likeButton = screen.getByText("like");
    // Click on like button twice
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
