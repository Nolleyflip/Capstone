const pool = require('../db');  // Add this line at the top

  // Get all businesses
  exports.getAllBusinesses= async (req, res) => {
    try {
      const allBusinesses = await pool.query(
        'SELECT * FROM businesses ORDER BY created_at DESC'
      );
      res.json(allBusinesses.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get single business by ID
  exports.getBusinessById= async (req, res) => {
    try {
        const { id } = req.params;
         if (!id) {
      return res.status(400).json({ error: "Business ID is required" });
    }
      const business = await pool.query(
        'SELECT * FROM businesses WHERE business_id = $1',
        [id]
      );
         if (business.rows.length === 0) {
      return res.status(404).json({ error: "Business not found" });
    }
      res.json(business.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Create new business
 exports.createBusiness= async (req, res) => {
    try {
      const { owner_id, business_name, address, phone_number, operating_hours, website } = req.body;
      const newBusiness = await pool.query(
        'INSERT INTO businesses (owner_id, business_name, address, phone_number, operating_hours, website) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [owner_id, business_name, address, phone_number, operating_hours, website]
      );
      res.json(newBusiness.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update business
 exports.updateBusiness= async (req, res) => {
    try {
      const { id } = req.params;
      const { business_name, address, phone_number, operating_hours, website } = req.body;
      const updatedBusiness = await pool.query(
        'UPDATE businesses SET business_name = $1, address = $2, phone_number = $3, operating_hours = $4, website = $5 WHERE business_id = $6 RETURNING *',
        [business_name, address, phone_number, operating_hours, website, id]
      );
      res.json(updatedBusiness.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Delete business
  exports.deleteBusiness= async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM businesses WHERE business_id = $1', [id]);
      res.json({ message: 'Business deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
