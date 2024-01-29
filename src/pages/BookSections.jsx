import React, { useState, useEffect } from "react";
import { DashboardWrapper, Collaborators, Section } from "@/components/app";
import { jwtDecode } from "jwt-decode";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addSection } from "@/redux/slices/book";
import {
  useLazyGetBookQuery,
  useUpdateBookMutation,
} from "@/redux/services/book";
import { setBook, setIsCollaborator } from "@/redux/slices/book";
import { useParams } from "react-router-dom";

const BookSections = () => {
  const book = useSelector((state) => state.book.book);
  const [author, setAuthor] = useState("");
  const isCollaborator = useSelector((state) => state.book.isCollaborator);
  const dispatch = useDispatch();
  let { id } = useParams();
  const [getBook, { error }] = useLazyGetBookQuery();
  const [updateBook, { error: updateError }] = useUpdateBookMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    const fetchBook = async () => {
      const response = await getBook({ id });
      dispatch(setBook(response.data));
      if (response.data?.collaborators.includes(decodedToken.email)) {
        dispatch(setIsCollaborator(true));
      } else {
        dispatch(setIsCollaborator(false));
      }
    };

    fetchBook();
  }, [id]);

  const saveBook = async () => {
    const response = await updateBook({ id, book });
    console.log(response);
  };

  return (
    <DashboardWrapper tab="books">
      <div className="flex flex-col gap-8 p-8 w-full max-w-[600px]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Book Sections</h2>
          {!isCollaborator && (
            <Collaborators>
              <Button variant="outline">Collaborators</Button>
            </Collaborators>
          )}
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-md">
              <span className="font-semibold">Book Title:</span> {book?.title}
            </h2>
            {/* <h2 className="text-md">
            <span className="font-semibold">Author:</span> {author}
          </h2> */}
          </div>
          {!isCollaborator && (
            <Button
              className="w-[120px] self-start"
              onClick={() => dispatch(addSection(null))}
            >
              Add Section
            </Button>
          )}
        </div>
        <div className={cn("flex flex-col gap-6 w-full")}>
          {book?.sections.map((section) => (
            <Section key={section.id} parentId={null} section={section} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={saveBook}>Save changes</Button>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export { BookSections };
