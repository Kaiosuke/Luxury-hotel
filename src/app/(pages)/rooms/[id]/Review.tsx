import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

import AlertDialogDelete from "@/app/_components/AlertDialogDelete";
import {
  addReview,
  getAllRoomTypeReview,
  getReview,
  updateReview,
} from "@/app/api/reviewRequest";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { authSelector } from "@/redux/selectors/authSelector";
import { useAppDispatch } from "@/redux/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";
import { reviewsSelector } from "@/redux/selectors/reviewsSelector";

const Review = () => {
  const { id }: { id: string } = useParams();

  const [reviewDeleteId, setReviewDeleteId] = useState("");
  const [reviewUpdateId, setReviewUpdateId] = useState("");
  const [openFormDelete, setOpenFormDelete] = useState(false);
  const [comment, setComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState("");

  const { currentUser } = useSelector(authSelector);
  const { roomTypeReview } = useSelector(reviewsSelector);

  const ref = useRef<HTMLTextAreaElement>(null);
  const refUpdate = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllRoomTypeReview(id)).unwrap();
      } catch (error) {
        const errorMessage =
          typeof error === "string" ? error : "Something went wrong";
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: errorMessage,
        });
      }
    })();
  }, []);

  const handleComment = async () => {
    if (!comment.length) {
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Comment box cannot be left blank",
      });
      return ref.current && ref.current.focus();
    }

    try {
      if (!currentUser?._id) {
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please login to book a room",
          action: (
            <ToastAction altText="Try again">
              <Link href="/auth">Login Now</Link>
            </ToastAction>
          ),
        });
      }
      const newComment = {
        userId: currentUser._id,
        roomTypeId: id,
        description: comment,
      };

      await dispatch(addReview(newComment)).unwrap();
      setComment("");
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed",
        description: errorMessage,
      });
    } finally {
      setReviewDeleteId("");
    }
  };

  const handleIsEdit = async ({ _id }: { _id: string }) => {
    try {
      const review = await dispatch(getReview(_id)).unwrap();
      setEdit(review.description);
      setReviewUpdateId(_id);
      setIsEdit(true);
      return refUpdate.current && refUpdate.current.focus();
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
    }
  };

  const handleUpdateEdit = async ({ _id }: { _id: string }) => {
    if (currentUser && currentUser._id)
      try {
        const review = {
          userId: currentUser._id,
          roomTypeId: id,
          description: edit,
        };
        await dispatch(updateReview({ _id, review })).unwrap();
        setIsEdit(false);
        setReviewUpdateId("");
      } catch (error) {
        const errorMessage =
          typeof error === "string" ? error : "Something went wrong";
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: errorMessage,
        });
      }
  };

  return (
    <div className="padding-main text-third">
      <div>
        <div>
          <Textarea
            ref={ref}
            className="bg-gray-100 text-third text-2xl "
            placeholder="Your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="pt-1">
            <Button variant={"secondary"} onClick={handleComment}>
              Comment
            </Button>
          </div>
        </div>
      </div>
      <div className="line-1 bg-gray-200" />
      <div className="w-full">
        <div>
          <div className="flex relative w-fit">
            <h2 className="text-size-2xl font-medium ">Comments</h2>
            <div className="absolute -top-4 -right-8 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              {roomTypeReview.length}
            </div>
          </div>
        </div>
        {roomTypeReview
          .slice()
          .reverse()
          .map((review) => {
            const user = review.userId as unknown as {
              _id: string;
              username: string;
            };
            return (
              <div key={review._id} className="flex w-full pt-4">
                <div className="flex items-center gap-4 w-[99%]">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <span className="text-lg font-medium">{user.username}</span>
                    {isEdit && review._id === reviewUpdateId ? (
                      <div>
                        <Textarea
                          ref={refUpdate}
                          value={edit}
                          onChange={(e) => setEdit(e.target.value)}
                          className="w-full border"
                        />
                        <div className="pt-2">
                          <Button
                            variant={"primary"}
                            onClick={() =>
                              review._id &&
                              handleUpdateEdit({ _id: review._id })
                            }
                          >
                            Update
                          </Button>
                          <Button
                            className="ml-2"
                            variant={"secondary"}
                            onClick={() => setIsEdit(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>{review.description}</div>
                    )}
                  </div>
                </div>
                {currentUser && user._id === currentUser._id && (
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="cursor-pointer">
                        <SlOptionsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-14 p-1.5">
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => {
                            review._id && handleIsEdit({ _id: review._id });
                          }}
                        >
                          <span>Edit</span>
                          <CiEdit />
                        </div>

                        <div
                          className="flex items-center justify-between cursor-pointer pt-2"
                          onClick={() => {
                            review._id && setReviewDeleteId(review._id);
                            setOpenFormDelete(true);
                          }}
                        >
                          <span className="text-red-500">Delete</span>
                          <FaDeleteLeft />
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {openFormDelete && (
        <AlertDialogDelete
          open={openFormDelete}
          onClose={setOpenFormDelete}
          _id={reviewDeleteId}
        />
      )}
    </div>
  );
};

export default Review;
