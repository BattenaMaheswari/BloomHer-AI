import pandas as pd

df = pd.read_csv(r"D:\BloomHer-AI\backend\ml\data\archive\pcos.csv")

print("Shape:", df.shape)
print("\nColumns:\n", df.columns)
print("\nMissing values:\n", df.isnull().sum())

print("\nTarget column check:")
print(df["PCOS (Y/N)"].value_counts() if "PCOS (Y/N)" in df.columns else "No target column found")

print("\nSample data:\n", df.head())
