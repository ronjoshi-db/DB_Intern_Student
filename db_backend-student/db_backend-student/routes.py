from flask import jsonify
from middleware import read_posts, read_post_by_id, create_post, update_post, delete_post
from middleware import register, login
from middleware import read_post_by_title


def initialize_routes(app):
    if app:
        app.add_url_rule('/api', 'list_routes', list_routes, methods=['GET'], defaults={'app': app})
        app.add_url_rule('/api/post', 'read_posts', read_posts, methods=['GET'])
        app.add_url_rule('/api/post', 'create_post', create_post, methods=['POST'])
        app.add_url_rule('/api/post/<int:post_id>', 'post_by_id', read_post_by_id, methods=['GET'])
        app.add_url_rule('/api/post/<int:post_id>', 'update_post', update_post, methods=['PUT'])
        app.add_url_rule('/api/post/<int:post_id>', 'delete_post', delete_post, methods=['DELETE'])
        app.add_url_rule('/api/user', 'register', register, methods=['POST'])
        app.add_url_rule('/api/user/login', 'login', login, methods=['POST'])
        app.add_url_rule('/api/post/<string:title>', 'post_by_title', read_post_by_title, methods=['GET'])


def list_routes(app):
    result = []
    for rt in app.url_map.iter_rules():
        result.append({
            'methods': list(rt.methods),
            'route': str(rt)
        })
    return jsonify({'routes': result, 'total': len(result)})

