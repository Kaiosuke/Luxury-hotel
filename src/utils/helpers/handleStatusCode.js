const handleSuccess200 = (res, data) => {
  return res.status(200).json({ message: "Successfully!", data });
};

const handleError404 = (res, error) => {
  return res.status(404).json({ message: "Not found data!" });
};

const handleError500 = (res, error) => {
  return res
    .status(500)
    .json({ message: "Internal server error", error: error.message });
};

export { handleSuccess200, handleError404, handleError500 };
