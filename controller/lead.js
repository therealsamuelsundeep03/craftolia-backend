function validateLead(body) {
  const VALID_SERVICES = [
    "Modular Kitchen",
    "Wardrobe",
    "TV Unit",
    "Full Home Interior",
    "Renovation",
    "Carpentry Work",
  ];

  try {
    const {
      full_name,
      phone_number,
      service_required,
      budget_range,
      city_area,
    } = body;

    if (
      !phone_number ||
      typeof phone_number !== "string" ||
      phone_number.trim() === ""
    ) {
      return { valid: false, message: "Phone number is mandatory" };
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone_number)) {
      return {
        valid: false,
        message: "Phone number must contain only digits (10–15 digits)",
      };
    }

    if (!service_required || !VALID_SERVICES.includes(service_required)) {
      return {
        valid: false,
        message:
          "Invalid service_required. Allowed values: " +
          VALID_SERVICES.join(", "),
      };
    }

    if (!full_name || typeof full_name !== "string") {
      return { valid: false, message: "full_name must be a string" };
    }

    if (budget_range && typeof budget_range !== "string") {
      return { valid: false, message: "budget_range must be a string" };
    }

    if (city_area && typeof city_area !== "string") {
      return { valid: false, message: "city_area must be a string" };
    }

    return { valid: true };
  } catch (error) {
    console.error("Validation error:", error);
    return { valid: false, message: "Validation failed due to internal error" };
  }
}

exports.createLead = async (req, res) => {
  try {
    const db = req?.app?.locals?.db;

    const {
      full_name,
      phone_number,
      service_required,
      budget_range,
      city_area,
    } = req.body;

    const validation = validateLead(req?.body);
    if (!validation?.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const sql = `
      INSERT INTO lead_data
      (full_name, phone_number, service_required, budget_range, city_area)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      full_name || null,
      phone_number,
      service_required,
      budget_range || null,
      city_area || null,
    ]);

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      leadId: result.insertId,
    });
  } catch (error) {
    console.error("🔥 createLead error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
