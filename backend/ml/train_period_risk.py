import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# -----------------------------
# 1. LOAD DATA
# -----------------------------
df = pd.read_csv("ml/data/period_risk.csv")

# -----------------------------
# 2. CLEAN COLUMN NAMES
# -----------------------------
df.columns = (
    df.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
    .str.replace("-", "_")
)

print("Columns in dataset:", df.columns.tolist())

# -----------------------------
# 3. REQUIRED FEATURES
# -----------------------------
features = [
    "age", "bmi", "cycle_length", "weight", "height",
    "fsh", "lh", "hb", "prolactin", "amh"
]

# Check missing columns (IMPORTANT FOR DEBUGGING)
missing = [col for col in features if col not in df.columns]

if missing:
    raise ValueError(f"Missing columns in CSV: {missing}")

# -----------------------------
# 4. CONVERT TO NUMERIC
# -----------------------------
for col in features + ["risk"]:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# -----------------------------
# 5. REMOVE BAD ROWS
# -----------------------------
df = df.dropna()

# -----------------------------
# 6. SPLIT DATA
# -----------------------------
X = df[features]
y = df["risk"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# -----------------------------
# 7. TRAIN MODEL
# -----------------------------
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# -----------------------------
# 8. EVALUATE MODEL
# -----------------------------
pred = model.predict(X_test)
accuracy = accuracy_score(y_test, pred)

print("Accuracy:", accuracy)

# -----------------------------
# 9. SAVE MODEL
# -----------------------------
joblib.dump(model, "ml/period_risk_model.pkl")

print("Model saved successfully ✔")