import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# ----------------------------

# 1. LOAD DATA

# ----------------------------

df = pd.read_csv("ml/data/archive/pcos.csv")

# ----------------------------

# 2. CLEAN DATA

# ----------------------------

df.columns = df.columns.str.strip()

# Convert AMH column to number

df["AMH(ng/mL)"] = pd.to_numeric(
df["AMH(ng/mL)"],
errors="coerce"
)

# Remove invalid rows

df = df.dropna()

# ----------------------------

# 3. SELECT FEATURES

# ----------------------------

features = [
"Age (yrs)",
"BMI",
"Cycle length(days)",
"LH(mIU/mL)",
"FSH(mIU/mL)",
"AMH(ng/mL)",
"Weight gain(Y/N)",
"hair growth(Y/N)"
]

X = df[features]
y = df["PCOS (Y/N)"]

# ----------------------------

# DEBUG

# ----------------------------

print("\n===== DATA TYPES =====")
print(X.dtypes)

print("\n===== NULL VALUES =====")
print(X.isnull().sum())

# ----------------------------

# 4. TRAIN TEST SPLIT

# ----------------------------

X_train, X_test, y_train, y_test = train_test_split(
X,
y,
test_size=0.2,
random_state=42
)

# ----------------------------

# 5. TRAIN MODEL

# ----------------------------

model = RandomForestClassifier(
n_estimators=100,
random_state=42
)

model.fit(X_train, y_train)

# ----------------------------

# 6. EVALUATE

# ----------------------------

y_pred = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, y_pred))

# ----------------------------

# 7. SAVE MODEL

# ----------------------------

joblib.dump(model, "ml/pcos_model.pkl")

print("\nModel saved successfully!")
