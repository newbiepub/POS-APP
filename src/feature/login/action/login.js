import configs from "../../../configs";

export async function companyLogin(email, password) {
    try {
        let response = await fetch(`${configs.api}/account/company/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, password: password})
        });
        response = await response.json();

        if(response.errors) {
            throw new Error(response.errors[0].message);
        }
        return response;
    }
    catch (e) {
        console.warn("error - companyLogin");
        throw e;
    }
}