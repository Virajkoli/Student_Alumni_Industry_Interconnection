-- Create posts tables
CREATE TABLE IF NOT EXISTS posts (
  post_id SERIAL PRIMARY KEY,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Foreign keys to all 5 user types (only one will be filled)
  student_id INTEGER REFERENCES student(id),
  college_id INTEGER REFERENCES college(id),
  industry_id INTEGER REFERENCES industry(id),
  alumni_id INTEGER REFERENCES alumni(id),
  startup_id INTEGER REFERENCES startup(id)
);

CREATE TABLE IF NOT EXISTS post_media (
  media_id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
  media_type VARCHAR(10) CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_comments (
  comment_id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Optional: attach media to comment
  media_url TEXT,

  -- Foreign keys for commenters (only one will be used)
  student_id INTEGER REFERENCES student(id),
  college_id INTEGER REFERENCES college(id),
  industry_id INTEGER REFERENCES industry(id),
  alumni_id INTEGER REFERENCES alumni(id),
  startup_id INTEGER REFERENCES startup(id)
);

CREATE TABLE IF NOT EXISTS post_reactions (
  reaction_id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
  reaction_type VARCHAR(10) CHECK (reaction_type IN ('like', 'love', 'share', 'wow', 'sad')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Foreign keys for who reacted (only one filled)
  student_id INTEGER REFERENCES student(id),
  college_id INTEGER REFERENCES college(id),
  industry_id INTEGER REFERENCES industry(id),
  alumni_id INTEGER REFERENCES alumni(id),
  startup_id INTEGER REFERENCES startup(id)
);

CREATE TABLE IF NOT EXISTS post_shares (
  share_id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
  shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Foreign keys for who shared (only one will be filled)
  shared_by_student_id INTEGER REFERENCES student(id),
  shared_by_college_id INTEGER REFERENCES college(id),
  shared_by_industry_id INTEGER REFERENCES industry(id),
  shared_by_alumni_id INTEGER REFERENCES alumni(id),
  shared_by_startup_id INTEGER REFERENCES startup(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_student_id ON posts(student_id);
CREATE INDEX IF NOT EXISTS idx_posts_college_id ON posts(college_id);
CREATE INDEX IF NOT EXISTS idx_posts_industry_id ON posts(industry_id);
CREATE INDEX IF NOT EXISTS idx_posts_alumni_id ON posts(alumni_id);
CREATE INDEX IF NOT EXISTS idx_posts_startup_id ON posts(startup_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);

CREATE INDEX IF NOT EXISTS idx_post_media_post_id ON post_media(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_post_id ON post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_post_shares_post_id ON post_shares(post_id);
