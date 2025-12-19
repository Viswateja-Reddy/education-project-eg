export const allocateSeats = ({ examName, students, rooms, existingAllocations }) => {
  if (!examName || !Array.isArray(students) || !Array.isArray(rooms) || !Array.isArray(existingAllocations)) {
    throw new Error('Invalid input to allocateSeats');
  }

  const normalizedId = (value) => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value._id) return String(value._id);
    return String(value);
  };

  const alreadyAllocatedStudentIds = new Set();
  const usedSeats = new Set();

  for (const allocation of existingAllocations) {
    if (!allocation) continue;
    if (allocation.examName !== examName) continue;

    const studentId = normalizedId(allocation.studentId);
    const roomId = normalizedId(allocation.roomId);

    if (studentId) {
      alreadyAllocatedStudentIds.add(studentId);
    }

    if (roomId && allocation.benchNumber && allocation.seatNumber) {
      const seatKey = `${roomId}:${allocation.benchNumber}:${allocation.seatNumber}`;
      usedSeats.add(seatKey);
    }
  }

  const studentsToAllocate = students.filter((student) => {
    const studentId = normalizedId(student._id ?? student.id ?? student.studentId ?? student);
    if (!studentId) return false;
    return !alreadyAllocatedStudentIds.has(studentId);
  });

  const totalCapacity = rooms.reduce((sum, room) => {
    const benches = Number(room.totalBenches) || 0;
    const seatsPerBench = Number(room.seatsPerBench) || 0;
    return sum + benches * seatsPerBench;
  }, 0);

  const existingSeatCountForExam = usedSeats.size;
  const availableSeats = totalCapacity - existingSeatCountForExam;

  if (availableSeats < studentsToAllocate.length) {
    throw new Error('Not enough seats available to allocate all students for this exam');
  }

  const shuffledStudents = [...studentsToAllocate];
  for (let i = shuffledStudents.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledStudents[i], shuffledStudents[j]] = [shuffledStudents[j], shuffledStudents[i]];
  }

  const allocations = [];
  let studentIndex = 0;

  const getRoomId = (room) => normalizedId(room._id ?? room.id ?? room.roomId ?? room);

  for (const room of rooms) {
    const roomId = getRoomId(room);
    const totalBenches = Number(room.totalBenches) || 0;
    const seatsPerBench = Number(room.seatsPerBench) || 0;

    if (!roomId || totalBenches <= 0 || seatsPerBench <= 0) {
      continue;
    }

    for (let bench = 1; bench <= totalBenches; bench++) {
      for (let seat = 1; seat <= seatsPerBench; seat++) {
        if (studentIndex >= shuffledStudents.length) {
          break;
        }

        const seatKey = `${roomId}:${bench}:${seat}`;
        if (usedSeats.has(seatKey)) {
          continue;
        }

        const student = shuffledStudents[studentIndex];
        const studentId = normalizedId(student._id ?? student.id ?? student.studentId ?? student);

        if (!studentId) {
          studentIndex += 1;
          continue;
        }

        allocations.push({
          examName,
          studentId,
          roomId,
          benchNumber: bench,
          seatNumber: seat,
        });

        usedSeats.add(seatKey);
        studentIndex += 1;
      }

      if (studentIndex >= shuffledStudents.length) {
        break;
      }
    }

    if (studentIndex >= shuffledStudents.length) {
      break;
    }
  }

  if (allocations.length !== studentsToAllocate.length) {
    throw new Error('Failed to allocate seats to all eligible students');
  }

  return allocations;
};
