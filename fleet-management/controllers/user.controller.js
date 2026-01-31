const { supabase } = require("../config/db");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (!["customer", "owner", "driver"].includes(role)) {
      return res.status(400).json({ msg: "Invalid Role" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password, role }])
      .select();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({ msg: "User Created", data });

    
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

