import User from "./models/user.model.js";
const cookieOption = {
  maxAge: 24 * 60 * 60 * 1000,
  httponly: true,
};

const signup = async (req, res) => {
  const { Name, email, password, bio, username } = req.body;

  if (!Name || !email || !password || !bio || !username) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ error: " User exists" });
  }
  try {
    const user = await User.create({
      Name,
      email,
      password,
      username,
      bio,
    });
    console.log(user);
    const token = await user.generateAuthToken();

    res.cookie("Token", token, cookieOption);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User registered successfully!!",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: " Registration failed" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ username }).select("+password");
    console.log(user);
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Email or Password Invalid", 400));
    }

    const token = await user.generateAuthToken();

    res.cookie("Token", token, cookieOption);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User logged in successfully!!",
      user,
    });
  } catch (error) {
    console.log( error);
    return res.status(400).json({ error: " login failed" });
  }
};

export { signup, login };
