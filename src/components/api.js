export async function getAllCompetitions() {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_DOMAIN}/competitions.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch competitions.");
  }

  const transformedCompetitions = [];

  for (const key in data) {
    const compObj = {
      id: key,
      ...data[key],
    };

    transformedCompetitions.push(compObj);
  }

  return transformedCompetitions;
}

export async function getAllFavCompetitions() {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_DOMAIN}/favorites.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch competitions.");
  }

  const transformedCompetitions = [];

  for (const key in data) {
    const compObj = {
      id: key,
      ...data[key],
    };

    transformedCompetitions.push(compObj);
  }
  return transformedCompetitions;
}

export async function getSingleCompetition(id) {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_DOMAIN}/competitions/${id}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch competition.");
  }

  const loadedComp = {
    id: id,
    ...data,
  };

  return loadedComp;
}

export async function addCompetiton(compData) {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_DOMAIN}/competitions.json`,
    {
      method: "POST",
      body: JSON.stringify(compData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create competition.");
  }

  return null;
}

export async function addFavorite(compData) {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_DOMAIN}/favorites.json`,
    {
      method: "POST",
      body: JSON.stringify(compData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add competition.");
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_DOMAIN}/comments/${requestData.id}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }
  const commentId = data.name;

  return commentId;
}

export async function getAllComments(id) {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_DOMAIN}/comments/${id}.json`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
