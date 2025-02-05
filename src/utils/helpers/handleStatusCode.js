const handleSuccess200 = (res, data) => {
  return res.status(200).json({ message: "Successfully!", data });
};

const handleSuccess201 = (res, data) => {
  return res.status(201).json({ message: "Successfully!", data });
};

const handleError401 = (res, message) => {
  return res.status(401).json({ message });
};

const handleError404 = (res) => {
  return res.status(404).json({ message: "Not found!" });
};

const handleError409 = (res, message) => {
  return res.status(404).json({ message });
};

const handleError500 = (res, error) => {
  return res
    .status(500)
    .json({ message: "Internal server error", error: error.message });
};

export {
  handleSuccess200,
  handleSuccess201,
  handleError401,
  handleError404,
  handleError409,
  handleError500,
};
