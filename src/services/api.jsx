import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3009/blogAprendizaje/v1",
    timeout: 3000,
    httpsAgent: false
});

export const getPublications = async () => {
    try {
        return await apiClient.get('publication/getPublications');
    } catch (error) {
        console.log("Hubo un error al obtener las publicaciones", error);
    }
}

export const currentUser = async () => {
    try {
        return await apiClient.get('user/currentUser');
    } catch (error) {
        console.log("Hubo un error al obtener el usuario actual", error);
    }
}

export const createComment = async (data) => {
    try {
        const response = await apiClient.post('commentary/createCommentary', data);
        return response.data;
    } catch (error) {
        console.log("Hubo un error al crear el comentario", error);
        throw error;
    }
};

export const getRecentPublications = async () => {
    try {
        return await apiClient.get('publication/getRecentPublications');
    } catch (error) {
        console.log("Hubo un error al obtener las publicaciones recientes", error);
    }
}

export const getCommentaries = async () => {
    try {
        return await apiClient.get('commentary/getCommentaries');
    } catch (error) {
        console.log("Hubo un error al obtener los comentarios", error);
    }
}

export const getPublicationsByCourse = async (course) => {
    try {
        return await apiClient.post('publication/filterPublicationsByCourse', { course });
    } catch (error) {
        console.log("Error al filtrar publicaciones por curso", error);
    }
};
