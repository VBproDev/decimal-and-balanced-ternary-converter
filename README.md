<meta name="description" content="Decimal ↔ Balanced Ternary Converter" />

# 🔁 Balanced Ternary Converter

Convert between Decimal and Balanced Ternary numbers — instantly and at scale.

## 🌐 Live Demo

👉 [Use the tool in your browser](https://vbprodev.github.io/decimal-and-balanced-ternary-converter/)

---

## 🧮 Features

- 🔢 Convert individual numbers between Decimal and Balanced Ternary.
- 📈 Bulk convert ranges — e.g., `1,1000` or `T0,1T1`.
- 🧵 Powered by Web Workers to handle large datasets smoothly without freezing the UI.
- 📋 Clipboard support for small outputs.
- 📄 Automatic .txt file download for large outputs (over 100,000 numbers).
- 📱 Responsive layout with accessibility-first design.
- ✅ Tested with bulk conversion of up to 21 million numbers.
  
The tool may handle even more — feel free to push its limits and let us know how it goes!

---

## 🧾 Input Format

| Type      | Format Example   | Notes                                      |
|-----------|------------------|--------------------------------------------|
| Single    | `25` or `T10`     | A single number                            |
| Range     | `1,1000` or `T0,1T1` | Inclusive range, e.g., from 1 to 1000     |

When using Balanced Ternary, the digit '-1' is represented by `T`.

---

## 📤 Output Options

- Up to 100,000 values: Copy directly to clipboard.
- Over 100,000 values: Download as a `.txt` file.

---

## 🚀 Tech Stack

- HTML, SCSS
- TypeScript
- Web Workers
- Accessible, semantic markup

---

## 🌟 Support the Project

If you found this tool helpful, consider giving it a ⭐! It really motivates us to do more

---
