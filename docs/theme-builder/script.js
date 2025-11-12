/* -------------------------------------------------
   1. Starter Theme (neutral)
   ------------------------------------------------- */
const starterTheme = {
  "name": "Default Discord Dark",
  "description": "The official Discord dark theme – perfect starting point.",
  "version": "1.0.0",
  "authors": [
    {
      "name": "Discord",
      "id": ""
    }
  ],
  "semanticColors": {
    "HEADER_PRIMARY": ["#ffffff"],
    "HEADER_SECONDARY": ["#b9bbbe"],
    "TEXT_NORMAL": ["#dcddde"],
    "TEXT_MUTED": ["#72767d"],
    "INTERACTIVE_NORMAL": ["#b9bbbe"],
    "INTERACTIVE_HOVER": ["#dcddde"],
    "INTERACTIVE_ACTIVE": ["#ffffff"],
    "INTERACTIVE_MUTED": ["#4f545c"],
    "BACKGROUND_PRIMARY": ["#36393f"],
    "BACKGROUND_SECONDARY": ["#2f3136"],
    "BACKGROUND_SECONDARY_ALT": ["#292b2f"],
    "BACKGROUND_TERTIARY": ["#202225"],
    "BACKGROUND_ACCENT": ["#4f545c"],
    "BACKGROUND_MOBILE_PRIMARY": ["#36393f"],
    "BACKGROUND_MOBILE_SECONDARY": ["#2f3136"],
    "BACKGROUND_MESSAGE_HOVER": ["rgba(4, 4, 5, 0.07)"],
    "BACKGROUND_MODIFIER_HOVER": ["rgba(79, 84, 92, 0.16)"],
    "BACKGROUND_MODIFIER_ACTIVE": ["rgba(79, 84, 92, 0.24)"],
    "BACKGROUND_MODIFIER_SELECTED": ["rgba(79, 84, 92, 0.32)"],
    "BACKGROUND_MODIFIER_ACCENT": ["#4f545c"],
    "BACKGROUND_MENTIONED": ["rgba(250, 166, 26, 0.05)"],
    "BACKGROUND_MENTIONED_HOVER": ["rgba(250, 166, 26, 0.08)"],
    "CHANNELTEXTAREA_BACKGROUND": ["#40444b"],
    "REDESIGN_ACTIVITY_CARD_BACKGROUND": ["#202225"],
    "REDESIGN_BUTTON_SECONDARY_BACKGROUND": ["#2f3136"],
    "REDESIGN_CHAT_INPUT_BACKGROUND": ["#2f3136"],
    "REDESIGN_BUTTON_TERTIARY_BACKGROUND": ["#292b2f"],
    "REDESIGN_BUTTON_SECONDARY_BORDER": ["#4f545c"],
    "REDESIGN_CHANNEL_CATEGORY_NAME_TEXT": ["#b9bbbe"],
    "REDESIGN_CHANNEL_NAME_TEXT": ["#b9bbbe"],
    "CHANNELS_DEFAULT": ["#b9bbbe"],
    "CHANNEL_ICON": ["#b9bbbe"],
    "TEXT_PRIMARY": ["#dcddde"],
    "TEXT_LINK": ["#00aff4"],
    "THREAD_CHANNEL_SPINE": ["#4f545c"]
  },
  "rawColors": {
    "PRIMARY_100": "#f5f5f5",
    "PRIMARY_200": "#e5e5e5",
    "PRIMARY_300": "#d4d4d4",
    "PRIMARY_400": "#b3b3b3",
    "PRIMARY_500": "#72767d",
    "PRIMARY_600": "#4f545c",
    "PRIMARY_700": "#36393f",
    "PRIMARY_800": "#2f3136",
    "BRAND_100": "#f5f5f5",
    "BRAND_130": "#e5e5e5",
    "BRAND_160": "#d4d4d4",
    "BRAND_200": "#b3b3b3",
    "BRAND_230": "#72767d",
    "BRAND_260": "#4f545c",
    "BRAND_300": "#36393f",
    "BRAND_330": "#2f3136",
    "BRAND_360": "#202225",
    "BRAND_400": "#1a1b1e",
    "BRAND_430": "#121315",
    "BRAND_460": "#0a0b0d",
    "BRAND_500": "#5865f2",
    "BRAND_530": "#4752c4",
    "BRAND_560": "#3c45a5",
    "BRAND_600": "#343d8c",
    "BRAND_700": "#2a3373",
    "BRAND_760": "#232a5c",
    "BRAND_800": "#1c214d",
    "BRAND_830": "#141a3d",
    "BRAND_860": "#0d1230",
    "BRAND_900": "#060a24",
    "GREEN_360": "#57f287",
    "YELLOW_360": "#fee75c",
    "RED_360": "#ed4245",
    "WHITE_500": "#ffffff",
    "BLACK_500": "#000000",
    "GUILD_BOOSTING_PINK": "#ff73fa",
    "GUILD_BOOSTING_PURPLE": "#b473ff",
    "STATUS_GREEN": "#3ba55c",
    "STATUS_YELLOW": "#faa61a",
    "STATUS_RED": "#ed4245",
    "STATUS_DARK_GRAY": "#747f8d"
  },
  "plus": {
    "version": "0",
    "customOverlays": true,
    "icons": {
      "ic_radio_circle_checked": "#5865f2",
      "ic_radio_circle_checked__overlay": "#ffffff",
      "ic_radio_square_24px": "#5865f2",
      "ic_radio_square_checked_24px": "#5865f2",
      "ic_radio_square_checked_24px__overlay": "#ffffff",
      "ic_selection_checked_24px": "#5865f2",
      "ic_selection_checked_24px__overlay": "#ffffff",
      "StatusMobileOnline": "#3ba55c",
      "StatusIdle": "#faa61a",
      "StatusDND": "#ed4245",
      "StatusOffline": "#747f8d",
      "StatusOnline": "#3ba55c",
      "StatusStreaming": "#593695"
    }
  },
  "background": {
    "blur": 0,
    "url": "",
    "alpha": 1
  },
  "spec": 2
};

let theme = starterTheme; // Initialize theme with starterTheme
let simpleMode = document.getElementById('simple-mode').checked;

/* -------------------------------------------------
   2. Color Picker
   ------------------------------------------------- */
function createPicker(container, label, hex, onChange) {
  const row = document.createElement('div');
  row.className = 'picker';
  const txt = document.createElement('span');
  txt.textContent = label;
  txt.style.flex = '1';
  const el = document.createElement('div');
  const picker = new iro.ColorPicker(el, {
    width: 120,
    color: hex || "#ffffff",
    borderWidth: 1,
    borderColor: "#fff",
  });
  const hexInput = document.createElement('input');
  hexInput.type = 'text';
  hexInput.className = 'hex-input';
  hexInput.value = hex;

  picker.on('color:change', c => {
    onChange(c.hexString);
    hexInput.value = c.hexString;
  });

  hexInput.addEventListener('change', () => {
    try {
      picker.color.hexString = hexInput.value;
    } catch (e) {
      // ignore invalid color
    }
  });

  row.append(txt, el, hexInput);
  container.appendChild(row);
  return picker;
}

/* -------------------------------------------------
   3. Populate UI
   ------------------------------------------------- */
function populateUI() {
  document.getElementById('meta-name').value = theme.name;
  document.getElementById('meta-desc').value = theme.description;
  document.getElementById('meta-version').value = theme.version;
  document.getElementById('author-name').value = theme.authors[0].name;

  document.getElementById('bg-url').value = theme.background.url || '';
  document.getElementById('bg-alpha').value = theme.background.alpha;
  document.getElementById('bg-blur').value = theme.background.blur;

  ['semantic-colors', 'raw-colors', 'plus-icons'].forEach(id => {
    document.getElementById(id).innerHTML = '';
  });

  // Semantic
  const editableSemanticColors = [
    "HEADER_PRIMARY", "HEADER_SECONDARY", "TEXT_NORMAL", "TEXT_MUTED",
    "INTERACTIVE_NORMAL", "INTERACTIVE_HOVER", "INTERACTIVE_ACTIVE", "INTERACTIVE_MUTED",
    "BACKGROUND_MOBILE_PRIMARY", "BACKGROUND_MOBILE_SECONDARY"
  ];

  for (const k of editableSemanticColors) {
    if (theme.semanticColors[k]) {
      createPicker(document.getElementById('semantic-colors'), k, theme.semanticColors[k][0], hex => {
        theme.semanticColors[k] = [hex];
        updatePreview();
      });
    }
  }

  // Raw & Plus (advanced)
  if (!simpleMode) {
    for (const [k, v] of Object.entries(theme.rawColors)) {
      createPicker(document.getElementById('raw-colors'), k, v, hex => {
        theme.rawColors[k] = hex;
        updatePreview();
      });
    }
    for (const [k, v] of Object.entries(theme.plus.icons)) {
      createPicker(document.getElementById('plus-icons'), k, v, hex => {
        theme.plus.icons[k] = hex;
        updatePreview();
      });
    }
  }

  updatePreview();
  toggleSimpleMode();
}

/* -------------------------------------------------
   4. Live Preview – Fixed & Realistic
   ------------------------------------------------- */
function updatePreview() {
  const preview = document.getElementById('discord-preview');
  const s = theme.semanticColors;

  const style = preview.style;
  style.setProperty('--bg-primary', s.BACKGROUND_MOBILE_PRIMARY[0]);
  style.setProperty('--bg-secondary', s.BACKGROUND_MOBILE_SECONDARY[0]);
  style.setProperty('--bg-tertiary', s.BACKGROUND_MOBILE_PRIMARY[0]); // Using mobile primary for tertiary
  style.setProperty('--text-normal', s.TEXT_NORMAL[0]);
  style.setProperty('--text-muted', s.TEXT_MUTED[0]);
  style.setProperty('--header-primary', s.HEADER_PRIMARY[0]);
  style.setProperty('--interactive-normal', s.INTERACTIVE_NORMAL[0]);
  style.setProperty('--interactive-hover', s.INTERACTIVE_HOVER[0]);
  style.setProperty('--interactive-active', s.INTERACTIVE_ACTIVE[0]);
  style.setProperty('--bg-modifier-selected', s.INTERACTIVE_HOVER[0]); // Using interactive hover for selected modifier
  style.setProperty('--channeltextarea-background', s.BACKGROUND_MOBILE_SECONDARY[0]);


  // Background image + overlay
  const bg = theme.background;
  preview.style.backgroundImage = bg.url ? `url(${bg.url})` : 'none';
  preview.style.backgroundSize = 'cover';

  let overlay = preview.querySelector('.bg-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'bg-overlay';
    preview.insertBefore(overlay, preview.firstChild);
  }
  overlay.style.background = `rgba(0, 0, 0, ${1 - bg.alpha})`;
  overlay.style.backdropFilter = `blur(${bg.blur * 20}px)`;
}

/* -------------------------------------------------
   5. Simple Mode Toggle
   ------------------------------------------------- */
function toggleSimpleMode() {
  const advanced = document.getElementById('advanced-sections');
  advanced.style.display = simpleMode ? 'none' : 'block';
}
document.getElementById('simple-mode').addEventListener('change', e => {
  simpleMode = e.target.checked;
  populateUI();
});

/* -------------------------------------------------
   6. Bind Inputs
   ------------------------------------------------- */
function bindInputs() {
  const inputs = [
    { id: 'meta-name', path: 'name' },
    { id: 'meta-desc', path: 'description' },
    { id: 'meta-version', path: 'version' },
    { id: 'author-name', path: 'authors[0].name' },
    { id: 'bg-url', path: 'background.url' },
    { id: 'bg-alpha', path: 'background.alpha', parse: parseFloat },
    { id: 'bg-blur', path: 'background.blur', parse: parseFloat },
  ];
  inputs.forEach(({ id, path, parse = v => v }) => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => {
      const val = parse(el.value);
      if (path.includes('authors')) {
        const [p1, p2] = path.split('authors[0].');
        theme.authors[0][p2] = val;
      } else if (path.includes('background')) {
        const key = path.split('.').pop();
        theme.background[key] = val;
      } else {
        theme[path] = val;
      }
      if (path.startsWith('background')) updatePreview();
    });
  });
}

/* -------------------------------------------------
   7. Import JSON
   ------------------------------------------------- */
document.getElementById('import-btn').onclick = () => document.getElementById('import-file').click();
document.getElementById('import-file').onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      theme = {
        ...starterTheme,
        ...imported,
        authors: imported.authors || starterTheme.authors,
        semanticColors: { ...starterTheme.semanticColors, ...imported.semanticColors },
        rawColors: { ...starterTheme.rawColors, ...imported.rawColors },
        plus: imported.plus ? { ...starterTheme.plus, icons: { ...starterTheme.plus.icons, ...(imported.plus.icons || {}) } } : starterTheme.plus,
        background: imported.background ? { ...starterTheme.background, ...imported.background } : starterTheme.background
      };
      populateUI();
    } catch (err) {
      alert('Invalid JSON');
      console.error(err);
    }
  };
  reader.readAsText(file);
};

/* -------------------------------------------------
   8. Download
   ------------------------------------------------- */
document.getElementById('download').onclick = () => {
  const final = JSON.parse(JSON.stringify(theme));
  final.authors = [{ name: document.getElementById('author-name').value, id: "" }];
  const blob = new Blob([JSON.stringify(final, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${final.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'theme'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

/* -------------------------------------------------
   9. Init
   ------------------------------------------------- */
populateUI();
bindInputs();