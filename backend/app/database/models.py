from sqlalchemy import Column, Integer, String, Text, DateTime, Float
from datetime import datetime

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    height = Column(Integer)
    weight = Column(Integer)
    goal = Column(String)


class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    user_message = Column(Text)
    ai_response = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class Period(Base):
    __tablename__ = "periods"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String)
    last_period_date = Column(String)
    cycle_length = Column(Integer)


class WaterIntake(Base):
    __tablename__ = "water_intake"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String)
    glasses = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)


class PCOSPrediction(Base):
    __tablename__ = "pcos_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String)
    risk = Column(String)
    confidence = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)