"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import DataTable from "@/app/_components/DataTable";
import { getAllReview, updateReview } from "@/app/api/reviewRequest";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { IForm, IReview } from "@/interfaces";
import { reviewsSelector } from "@/redux/selectors/reviewsSelector";
import { useAppDispatch } from "@/redux/store";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingProcess from "@/app/_components/Loading";
import FormDeleteReview from "@/app/_components/dashboard/reviews/FormDeleteReview";

const ReviewsTable = ({ open, onClose }: IForm) => {
  const { reviews } = useSelector(reviewsSelector);

  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllReview(search));
  }, [debounce]);

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const handleDelete = (id: string) => {
    setSelectedReviewId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedReviewId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const ReviewTypeColumns: ColumnDef<IReview>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "userId",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const user = row.original.user;
        return <div>{user?.username}</div>;
      },
    },
    {
      accessorKey: "roomTypeId",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Room Type
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const roomType = row.original.roomType;
        return <div>{roomType?.title}</div>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-sidebar-four text-primary"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => id && handleDelete(id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        data={reviews}
        columns={ReviewTypeColumns}
        filterPlaceholders="ReviewType"
        search={search}
        setSearch={setSearch}
      />

      {openFormDelete && (
        <FormDeleteReview
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedReviewId}
        />
      )}
    </>
  );
};

export default ReviewsTable;
