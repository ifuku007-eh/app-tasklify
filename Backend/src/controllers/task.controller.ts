import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types";

const prisma = new PrismaClient();

// CREATE TASK
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, columnId, order } = req.body;
    const userId = req.user?.userId;

    if (!title || !columnId) {
      return res.status(400).json({ message: "Title dan columnId wajib diisi" });
    }

    const column = await prisma.column.findUnique({
      where: { id: columnId },
      include: {
        board: { include: { members: true } },
      },
    });

    if (!column) {
      return res.status(404).json({ message: "Column tidak ditemukan" });
    }

    const isMember = column.board.members.some(
      (m) => m.userId === userId
    );

    if (!isMember) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || "MEDIUM",
        order: order || 0,
        columnId,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat task" });
  }
};

// GET DETAIL TASK
export const getTaskDetail = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        labels: { include: { label: true } },
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil task" });
  }
};

// UPDATE TASK (EDIT + DRAG)
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const {
      title,
      description,
      priority,
      columnId,
      order,
      dueDate,
    } = req.body;

    const updated = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        columnId, 
        order,   
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });

    res.json({
      message: "Task berhasil diupdate",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal update task" });
  }
};

// MOVE TASK (DRAG & DROP API)
export const moveTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId, columnId, order } = req.body;

    if (!taskId || !columnId) {
      return res.status(400).json({ message: "Invalid move payload" });
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        columnId,
        order: order ?? 0,
      },
    });

    res.json({
      message: "Task berhasil dipindahkan",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal move task" });
  }
};

// DELETE TASK
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal delete task" });
  }
};