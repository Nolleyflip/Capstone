const pool = require('../db')

const createReview = async (req, res) => {
  const { business_id, rating, review_text } = req.body
  const user_id = req.user.id

  try {
    const newReview = await pool.query(
      'INSERT INTO reviews (business_id, user_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *',
      [business_id, user_id, rating, review_text]
    )
    res.json(newReview.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getReviews = async (req, res) => {
  try {
    const reviews = await pool.query('SELECT * FROM reviews')
    res.json(reviews.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getBusinessReviewsWithResponses = async (req, res) => {
  const { business_id } = req.params;
  
  try {
    const reviewsWithResponses = await pool.query(`
      SELECT 
        r.review_id,
        r.business_id,
        r.rating,
        r.review_text,
        r.created_at as review_created,
        reviewer.username as reviewer_name,
        COALESCE(
          json_agg(
            json_build_object(
              'response_id', res.response_id,
              'response_text', res.response_text,
              'created_at', res.created_at,
              'responder_name', responder.username,
              'responder_id', responder.user_id
            )
          ) FILTER (WHERE res.response_id IS NOT NULL),
          '[]'
        ) as responses
      FROM reviews r
      LEFT JOIN responses res ON r.review_id = res.review_id
      LEFT JOIN users reviewer ON r.user_id = reviewer.user_id
      LEFT JOIN users responder ON res.user_id = responder.user_id
      WHERE r.business_id = $1
      GROUP BY 
        r.review_id,
        r.business_id,
        r.rating,
        r.review_text,
        r.created_at,
        reviewer.username
      ORDER BY r.created_at DESC
    `, [business_id])
    res.json(reviewsWithResponses.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getReviewsByBusiness = async (req, res) => {
  const { business_id } = req.params
  try {
    const reviews = await pool.query(
      'SELECT reviews.*, users.username FROM reviews JOIN users ON reviews.user_id = users.user_id WHERE business_id = $1',
      [business_id]
    )
    res.json(reviews.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateReview = async (req, res) => {
  const { id } = req.params
  const { rating, review_text } = req.body
  const user_id = req.user.id

  try {
    const updatedReview = await pool.query(
      'UPDATE reviews SET rating = $1, review_text = $2 WHERE review_id = $3 AND user_id = $4 RETURNING *',
      [rating, review_text, id, user_id]
    )
    console.log(updatedReview.rows[0])
    res.json(updatedReview.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const deleteReview = async (req, res) => {
  const { id } = req.params
  const user_id = req.user.id
console.log(id, user_id)
  try {
    await pool.query(
      'DELETE FROM reviews WHERE review_id = $1 AND user_id = $2',
      [id, user_id]
    )
    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}  

const createResponse = async (req, res) => {
  const { review_id, business_id, response_text } = req.body
  const user_id = req.user.id

  try {
    const newResponse = await pool.query(
      'INSERT INTO responses (review_id, business_id, user_id, response_text) VALUES ($1, $2, $3, $4) RETURNING *',
      [review_id, business_id, user_id, response_text]
    )
    res.json(newResponse.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateResponse = async (req, res) => {
  const { id } = req.params;
  const { response_text } = req.body;
  const user_id = req.user.id;

  try {
    const updatedResponse = await pool.query(
      'UPDATE responses SET response_text = $1 WHERE response_id = $2 AND user_id = $3 RETURNING *',
      [response_text, id, user_id]
    );

    if (updatedResponse.rows.length === 0) {
      return res.status(403).json({ error: 'You can only update your own responses' });
    }

    res.json(updatedResponse.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteResponse = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const deletedResponse = await pool.query(
      'DELETE FROM responses WHERE response_id = $1 AND user_id = $2 RETURNING *',
      [id, user_id]
    );

    if (deletedResponse.rows.length === 0) {
      return res.status(403).json({ error: 'You can only delete your own responses' });
    }

    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviews,
  getReviewsByBusiness,
  getBusinessReviewsWithResponses,
  updateReview,
  deleteReview,
  createResponse,
  updateResponse,
  deleteResponse
}
