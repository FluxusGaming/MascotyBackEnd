export const logout = async (req, res) => {
  if (req.user) {
    return res
      .status(200)
      .cookie("auth-token", "logout", {
        sameSite: "None",
        path: "/",
        httpOnly: true,
        secure: true,
      })
      .json({ message: "Tu sesion fue cerrada!" });
  } else {
    res.status(200).json({
      error: true,
      errorCode: 401,
      data: null,
      msg: `Unauthorized`,
    });
  }
};
