const Error = (status = 500, message = "Internal Server Error") => {
  return { status, message };
};

export default Error;
