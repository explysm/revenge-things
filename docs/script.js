document.addEventListener('DOMContentLoaded', () => {
    const themeGrid = document.getElementById('theme-grid');
    const githubThemesApiUrl = 'https://api.github.com/repos/explysm/revenge-things/contents/themes';

    async function fetchThemes() {
        try {
            // Show loading spinner
            themeGrid.innerHTML = '<div class="loading-spinner"></div>';

            const response = await fetch(githubThemesApiUrl);
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.statusText}`);
            }
            const files = await response.json();

            const themeFiles = files.filter(file => file.type === 'file' && file.name.endsWith('.json'));

            if (themeFiles.length === 0) {
                themeGrid.innerHTML = '<p>No themes found yet. Check back later!</p>';
                return;
            }

            themeGrid.innerHTML = ''; // Clear loading spinner

            for (const file of themeFiles) {
                const themeResponse = await fetch(file.download_url);
                if (!themeResponse.ok) {
                    console.error(`Failed to fetch theme: ${file.name}, ${themeResponse.statusText}`);
                    continue;
                }
                const themeData = await themeResponse.json();
                renderThemeCard(themeData, file.download_url);
            }

        } catch (error) {
            console.error('Error fetching themes:', error);
            themeGrid.innerHTML = `<p style="color: var(--discord-red);">Failed to load themes: ${error.message}. Please try again later.</p>`;
        }
    }

    function renderThemeCard(theme, downloadUrl) {
        const themeCard = document.createElement('div');
        themeCard.className = 'theme-card';

        const themeName = theme.name || 'Untitled Theme';
        const themeDescription = theme.description || 'No description provided.';
        const themeAuthor = theme.authors && theme.authors.length > 0 ? theme.authors[0].name : 'Unknown Author';

        themeCard.innerHTML = `
            <div class="theme-card-header">
                <h3>${themeName}</h3>
                <p>${themeDescription}</p>
                <span class="author">By: ${themeAuthor}</span>
            </div>
            <div class="theme-card-actions">
                <a href="${downloadUrl}" download="${themeName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json" class="btn btn-download">Download</a>
                <!-- Add a preview button if a preview mechanism is implemented -->
                <!-- <button class="btn btn-preview">Preview</button> -->
            </div>
        `;
        themeGrid.appendChild(themeCard);
    }

    fetchThemes();
});
