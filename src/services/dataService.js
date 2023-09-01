function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));
    return { token, cbid };
}

export async function getUser() {
    const browserData = getSession();
    const headerOption = {
        method: "GET",
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`
        }
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${browserData.cbid}`, headerOption);
    if (!response.ok) {
        // eslint-disable-next-line
        throw { message: response.statusText, status: response.status }
    }
    const data = await response.json();
    return data;
}

export async function getUserOrders() {
    const browserData = getSession();
    const headerOption = {
        method: "GET",
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`
        }
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${browserData.cbid}`, headerOption);
    if (!response.ok) {
        // eslint-disable-next-line
        throw { message: response.statusText, status: response.status }
    }
    const data = await response.json();
    return data;
}

export async function createOrder(cartList, total, user) {
    const browserData = getSession();
    const order = {
        products: cartList, amount_paid: total, quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id,
        }
    }
    const headerOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`
        },
        body: JSON.stringify(order)
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, headerOption);
    if (!response.ok) {
        // eslint-disable-next-line
        throw { message: response.statusText, status: response.status }
    }
    const data = await response.json();
    return data;
}
