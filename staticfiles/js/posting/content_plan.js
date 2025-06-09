const setupContentPlanManagement = () => {
    const contentPlanList = document.getElementById('contentPlanList');
    const generateContentPlanBtn = document.getElementById('generateContentPlanBtn');
    const regenerateContentPlanBtn = document.getElementById('regenerateContentPlanBtn');

    // Генерация контент-плана при переходе к шагу 4
    generateContentPlanBtn.addEventListener('click', () => {
        showLoading('Генерация контент-плана...');
        setTimeout(() => {
            generateContentPlan();
            renderContentPlan();
            hideLoading();
        }, 2000);
    });

    // Повторная генерация контент-плана
    regenerateContentPlanBtn.addEventListener('click', () => {
        showLoading('Генерация нового контент-плана...');
        setTimeout(() => {
            generateContentPlan();
            renderContentPlan();
            hideLoading();
        }, 2000);
    });

    // Генерация контент-плана на основе выбранных тем
    const generateContentPlan = () => {
        window.contentPlan = [];
        const currentDate = new Date();

        window.generatedTopics.forEach((topic, index) => {
            const publishDate = new Date(currentDate);
            publishDate.setDate(publishDate.getDate() + index * 2);
            const formattedDate = publishDate.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            window.contentPlan.push({
                id: Date.now() + index,
                title: topic.title,
                description: topic.description,
                publishDate: formattedDate,
                platform: index % 2 === 0 ? 'instagram' : 'facebook'
            });
        });
    };

    // Отрисовка контент-плана
    const renderContentPlan = () => {
        contentPlanList.innerHTML = '';
        window.contentPlan.forEach((item, index) => {
            const planItem = document.createElement('div');
            planItem.className = 'content-plan-item mb-3';
            planItem.dataset.itemId = item.id;

            let platformIcon = '';
            let platformName = '';
            if (item.platform === 'instagram') {
                platformIcon = '<i class="ph ph-instagram-logo"></i>';
                platformName = 'Instagram';
            } else if (item.platform === 'facebook') {
                platformIcon = '<i class="ph ph-facebook-logo"></i>';
                platformName = 'Facebook';
            } else if (item.platform === 'linkedin') {
                platformIcon = '<i class="ph ph-linkedin-logo"></i>';
                platformName = 'LinkedIn';
            } else if (item.platform === 'twitter') {
                platformIcon = '<i class="ph ph-twitter-logo"></i>';
                platformName = 'Twitter';
            }

            planItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="drag-handle me-3">
                                <i class="ph ph-dots-six-vertical"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="d-flex align-items-center">
                                        <span class="badge bg-secondary me-2">${index + 1}</span>
                                        <input type="text" class="form-control plan-item-title" value="${item.title}">
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="platform-badge me-2" title="${platformName}">
                                            ${platformIcon}
                                        </div>
                                        <select class="form-select form-select-sm platform-select" style="width: auto;">
                                            <option value="instagram" ${item.platform === 'instagram' ? 'selected' : ''}>Instagram</option>
                                            <option value="facebook" ${item.platform === 'facebook' ? 'selected' : ''}>Facebook</option>
                                            <option value="linkedin" ${item.platform === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                                            <option value="twitter" ${item.platform === 'twitter' ? 'selected' : ''}>Twitter</option>
                                        </select>
                                        <div class="date-picker-container ms-2">
                                            <input type="text" class="form-control form-control-sm publish-date" value="${item.publishDate}" readonly>
                                            <i class="ph ph-calendar"></i>
                                        </div>
                                        <button class="btn btn-sm btn-outline-danger ms-2 delete-plan-item-btn">
                                            <i class="ph ph-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <textarea class="form-control plan-item-description" rows="2">${item.description}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            contentPlanList.appendChild(planItem);

            planItem.querySelector('.plan-item-title').addEventListener('input', function () {
                const itemId = parseInt(planItem.dataset.itemId);
                const item = window.contentPlan.find(i => i.id === itemId);
                if (item) item.title = this.value;
            });

            planItem.querySelector('.plan-item-description').addEventListener('input', function () {
                const itemId = parseInt(planItem.dataset.itemId);
                const item = window.contentPlan.find(i => i.id === itemId);
                if (item) item.description = this.value;
            });

            planItem.querySelector('.platform-select').addEventListener('change', function () {
                const itemId = parseInt(planItem.dataset.itemId);
                const item = window.contentPlan.find(i => i.id === itemId);
                if (item) {
                    item.platform = this.value;
                    const platformBadge = planItem.querySelector('.platform-badge');
                    if (this.value === 'instagram') {
                        platformBadge.innerHTML = '<i class="ph ph-instagram-logo"></i>';
                        platformBadge.title = 'Instagram';
                    } else if (this.value === 'facebook') {
                        platformBadge.innerHTML = '<i class="ph ph-facebook-logo"></i>';
                        platformBadge.title = 'Facebook';
                    } else if (this.value === 'linkedin') {
                        platformBadge.innerHTML = '<i class="ph ph-linkedin-logo"></i>';
                        platformBadge.title = 'LinkedIn';
                    } else if (this.value === 'twitter') {
                        platformBadge.innerHTML = '<i class="ph ph-twitter-logo"></i>';
                        platformBadge.title = 'Twitter';
                    }
                }
            });

            planItem.querySelector('.date-picker-container').addEventListener('click', function () {
                const itemId = parseInt(planItem.dataset.itemId);
                const item = window.contentPlan.find(i => i.id === itemId);
                if (item) {
                    const dateParts = item.publishDate.split('.');
                    const currentDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                    currentDate.setDate(currentDate.getDate() + 1);
                    item.publishDate = currentDate.toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    planItem.querySelector('.publish-date').value = item.publishDate;
                }
            });

            planItem.querySelector('.delete-plan-item-btn').addEventListener('click', function () {
                const itemId = parseInt(planItem.dataset.itemId);
                window.contentPlan = window.contentPlan.filter(i => i.id !== itemId);
                planItem.remove();
            });
        });

        if (window.contentPlan.length > 0) {
            new Sortable(contentPlanList, {
                handle: '.drag-handle',
                animation: 150,
                onEnd: function (evt) {
                    const newContentPlan = [];
                    document.querySelectorAll('.content-plan-item').forEach(item => {
                        const itemId = parseInt(item.dataset.itemId);
                        const planItem = window.contentPlan.find(i => i.id === itemId);
                        if (planItem) newContentPlan.push(planItem);
                    });
                    window.contentPlan = newContentPlan;
                }
            });
        }
    };

    return { generateContentPlan, renderContentPlan };
};

export { setupContentPlanManagement };
