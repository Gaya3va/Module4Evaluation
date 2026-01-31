const supabase = require("../config/db");

exports.addVehicle = async (req, res) => {

  const { owner_id } = req.body;

  const { data: owner } = await supabase
    .from("users")
    .select("*")
    .eq("id", owner_id)
    .single();

  if (owner.role !== "owner") {
    return res.status(403).json({ msg: "Only Owners Allowed" });
  }

  const { data, error } = await supabase
    .from("vehicles")
    .insert([req.body]);

  if (error) return res.status(400).json({ error });

  res.json(data);
};


exports.assignDriver = async (req, res) => {
  const { vehicleId } = req.params;
  const { driver_id } = req.body;

  const { data, error } = await supabase
    .from("vehicles")
    .update({ driver_id })
    .eq("id", vehicleId);

  res.json(data);
};


exports.getVehicle = async (req, res) => {

  const { vehicleId } = req.params;

  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single();

  res.json(data);
};
