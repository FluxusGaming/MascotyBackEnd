export const whoami = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      id: req.user.uuid,
      username: req.user.username,
      avatar: req.user.avatar_url,
    });
  } else {
    res.status(200).json({
      error: true,
      errorCode: 401,
      data: null,
      msg: `Unauthorized`,
    });
  }
};
