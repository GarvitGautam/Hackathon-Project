from flask import Flask, request, jsonify
from utils.image_processing import save_image, allowed_file
from utils.ai_processing import diagnose_disease
from utils.ndlm_integration import integrate_with_ndlm
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        file_path = save_image(file)
        diagnosis = diagnose_disease(file_path)
        ndlm_response = integrate_with_ndlm(diagnosis)

        return jsonify({
            'diagnosis': diagnosis,
            'ndlm_status': ndlm_response
        })

    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True)
