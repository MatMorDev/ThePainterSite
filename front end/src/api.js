const BASE_URL_SUBSCRIBERS = "http://localhost:8080/subscribers/";
const BASE_URL_LOG = "http://localhost:8080/logins/user/username/";
const BASE_URL_ARTICLES = "http://localhost:8080/articles/";
const BASE_URL_SERVICES = "http://localhost:8080/services/";
const BASE_URL_CUSTOMER = "http://localhost:8080/shop/customers/";
const BASE_URL_FAQ = "http://localhost:8080/faqs/";

//GET subscriber by id
export const getSubscriberId = async (id) => {
  try {
    const response = await fetch(BASE_URL_SUBSCRIBERS + "admin/get/" + id);
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

// POST subscriber
export const postSubscriber = async (user) => {
  try {
    const response = await fetch(BASE_URL_SUBSCRIBERS + "user/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

// POST customer
export const postCustomer = async (customer) => {
  try {
    const response = await fetch(BASE_URL_CUSTOMER + "user/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

// POST subscriber LOGIN
export const loginSubscriber = async (subscriber) => {
  try {
    const response = await fetch(BASE_URL_LOG + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriber),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

// POST subscriber LOGOUT
export const logoutSubscriber = async (subscriber) => {
  try {
    const response = await fetch(BASE_URL_LOG + "logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriber),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

// GET articles
export const getArticles = async () => {
  try {
    const response = await fetch(BASE_URL_ARTICLES + "get");
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//POST message
export const postMessage = async (message, idSub, idArt) => {
  try {
    const response = await fetch(
      BASE_URL_SUBSCRIBERS + idSub + "/comments/" + idArt,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

// GET services
export const getServices = async () => {
  try {
    const response = await fetch(BASE_URL_SERVICES + "get");
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//POST customer order
export const postCustomerOrder = async (customer, service, quantity) => {
  try {
    const response = await fetch(
      BASE_URL_CUSTOMER +
        customer +
        "/servicesbought/" +
        service +
        "qty=" +
        quantity,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//GET customer
export const getCustomerByEmail = async (email) => {
  try {
    const response = await fetch(BASE_URL_CUSTOMER + "admin/getemail/" + email);
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//PUT customer
export const putCustomer = async (id, customer) => {
  try {
    const response = await fetch(BASE_URL_CUSTOMER + "admin/put/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//PUT order
export const putOrder = async (customerId, orderId, orderBody) => {
  try {
    const response = await fetch(
      BASE_URL_CUSTOMER + "admin/" + customerId + "/servicesbought/" + orderId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderBody),
      }
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//DELETE subscriber
export const deleteSubscriber = async (id) => {
  try {
    const response = await fetch(BASE_URL_SUBSCRIBERS + "delete/" + id, {
      method: "DELETE",
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//PUT subscriber
export const putSubscriber = async (id, subscriber) => {
  try {
    const response = await fetch(BASE_URL_SUBSCRIBERS + "admin/put/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriber),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//DELETE comment
export const deleteComment = async (idSubscriber, idComment) => {
  try {
    const response = await fetch(
      BASE_URL_SUBSCRIBERS + idSubscriber + "/comments/" + idComment,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//GET faq
export const getFaq = async () => {
  try {
    const response = await fetch(BASE_URL_FAQ + "get");
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//GET allSubscribers
export const getAllSubscribers = async (firstName, lastName) => {
  try {
    const response = await fetch(
      BASE_URL_SUBSCRIBERS +
        "admin/get?firstName=" +
        firstName +
        "&lastName=" +
        lastName
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//GET allCustomers
export const getAllCustomers = async (firstName, lastName) => {
  try {
    const response = await fetch(
      BASE_URL_CUSTOMER +
        "admin/get?firstName=" +
        firstName +
        "&lastName=" +
        lastName
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//PUT comment
export const putComment = async (idSubscriber, idComment, commentBody) => {
  try {
    const response = await fetch(
      BASE_URL_SUBSCRIBERS + idSubscriber + "/comments/" + idComment,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentBody),
      }
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//DELETE customer
export const deleteCustomer = async (id) => {
  try {
    const response = await fetch(BASE_URL_CUSTOMER + "admin/delete/" + id, {
      method: "DELETE",
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

//DELETE order
export const deleteOrder = async (idCustomer, orderId) => {
  try {
    const response = await fetch(
      BASE_URL_CUSTOMER + "admin/" + idCustomer + "/servicesbought/" + orderId,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
