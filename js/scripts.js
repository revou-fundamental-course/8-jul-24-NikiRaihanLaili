document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.bmi-form');
    const resultContainer = document.querySelector('.result');
    const mainContent = document.querySelector('.main-content');

    // Function unutuk validasi input
    function validateForm(formData) {
        let errors = {};

        // validasi gender
        if (!formData.gender) {
            errors.gender = 'Jenis kelamin tidak boleh kosong.';
        }

        // validasi berat badan
        if (!formData.weight) {
            errors.weight = 'Berat badan tidak boleh kosong.';
        } else if (isNaN(formData.weight)) {
            errors.weight = 'Berat badan harus berupa angka.';
        }

        // validasi umur
        if (!formData.age) {
            errors.age = 'Umur tidak boleh kosong.';
        } else if (isNaN(formData.age)) {
            errors.age = 'Umur harus berupa angka.';
        }

        // validasi tinggi badan
        if (!formData.height) {
            errors.height = 'Tinggi badan tidak boleh kosong.';
        } else if (isNaN(formData.height)) {
            errors.height = 'Tinggi badan harus berupa angka.';
        }

        return errors;
    }

    // form submit
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // mengambil input values
        const gender = form.querySelector('input[name="gender"]:checked');
        const weight = form.querySelector('input[name="weight"]').value.trim();
        const age = form.querySelector('input[name="age"]').value.trim();
        const height = form.querySelector('input[name="height"]').value.trim();

        const formData = {
            gender: gender ? gender.value : null,
            weight: weight,
            age: age,
            height: height
        };

        // validasi form data
        const errors = validateForm(formData);

        if (Object.keys(errors).length > 0) {
            // validasi errors
            let errorMessages = '';
            for (let key in errors) {
                errorMessages += `<p>${errors[key]}</p>`;
            }
            resultContainer.innerHTML = errorMessages;
            resultContainer.classList.remove('hidden');
            resultContainer.style.backgroundColor = '#FF0000'; // Red
        } else {
            // Calculate BMI
            const weightValue = parseFloat(weight);
            const heightValue = parseFloat(height) / 100; // konversi cm ke meters

            const bmi = (weightValue / (heightValue * heightValue)).toFixed(2); // Calculate BMI 
            let category = '';

            // Determine BMI category
            if (bmi < 18.5) {
                category = 'Kekurangan berat badan';
                resultContainer.style.backgroundColor = '#FFA500'; // Orange
            } else if (bmi >= 18.5 && bmi < 24.9) {
                category = 'Normal (ideal)';
                resultContainer.style.backgroundColor = '#4CAF50'; // Green
            } else if (bmi >= 25 && bmi < 29.9) {
                category = 'Kelebihan berat badan';
                resultContainer.style.backgroundColor = '#FF5733'; // Orange-Red
            } else {
                category = 'Kegemukan (Obesitas)';
                resultContainer.style.backgroundColor = '#FF0000'; // Red
            }

            // result
            resultContainer.innerHTML = `
                <h2>Hasil BMI</h2>
                <p>BMI Anda adalah: ${bmi}</p>
                <p>Kategori: ${category}</p>
            `;
            resultContainer.classList.remove('hidden'); // menampilkan hasil di container
            mainContent.classList.remove('center'); // menyesuaikan layout
        }
    });

    // unutuk form reset
    form.querySelector('.t_clear').addEventListener('click', function() {
        form.reset(); // Clear form inputs
        resultContainer.classList.add('hidden'); // menyembuyikan result container
        mainContent.classList.add('center'); // membuat conten berada di tengah
    });
});
