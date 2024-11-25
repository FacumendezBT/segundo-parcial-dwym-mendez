const BASE_URL = "http://161.35.143.238:8000/fmendez";

export const getEquipos = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log("Error al cargar equipos");
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export const getEquipoById = async (id) => {
    const URL = `${BASE_URL}/${id}`;
    try {
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log("Error al cargar equipo por id");
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export const createEquipo = async (data) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log("Error al crear el equipo");
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export const deleteEquipo = async (id) => {
    const URL = `${BASE_URL}/${id}`;
    try {
        const response = await fetch(URL, {
            method: "DELETE",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log("Error al borrar el equipo");
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export const updateEquipo = async (data, id) => {
    const URL = `${BASE_URL}/${id}`;
    try {
        const response = await fetch(URL, {
            method: "PUT",
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log("Error actualizando el equipo");
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};