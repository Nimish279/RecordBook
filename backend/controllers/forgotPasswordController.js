import User from "../models/User.js";

export const forgotPassword = async (req, res) => {
  try {
    let { email, newPassword, confirmPassword } = req.body;

    // Validation
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    email = String(email).trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // ❌ Don’t hash here, let pre('save') in User.js handle it
    user.password = newPassword;
    await user.save(); // ✅ password will be hashed automatically

    console.log("Password updated for:", email);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
