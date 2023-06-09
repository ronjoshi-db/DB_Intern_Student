import http from "./axios-common";

class BlogDataService {

    getAll() {
        return http.get("/post");
    }

    get(id) {
        return http.get(`/post/${id}`);
    }

    create(data) {
        return http.post("/post", data);
    }

    update(id, data) {
        return http.put(`/post/${id}`, data);
    }

    delete(id) {
        return http.delete(`/post/${id}`);
    }

    register(data) {
        return http.post("/user", data);
    }

    login(data) {
        return http.post("/user/login", data);
    }

    findByTitle(title) {
        return http.get(`/post/${title}`);
    }
}

export default new BlogDataService();