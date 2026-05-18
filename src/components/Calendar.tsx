'use client';

import { useState } from 'react';

const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MOIS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const RESERVED_DATES: string[] = [
  // format YYYY-MM-DD
  '2026-04-10', '2026-04-11', '2026-04-12', '2026-04-13',
  '2026-04-25', '2026-04-26', '2026-04-27', '2026-04-28', '2026-04-29', '2026-04-30',
  '2026-05-15', '2026-05-16', '2026-05-17', '2026-05-18', '2026-05-19',
  '2026-07-01', '2026-07-02', '2026-07-03', '2026-07-04', '2026-07-05',
  '2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09', '2026-07-10',
  '2026-07-11', '2026-07-12', '2026-07-13', '2026-07-14',
  '2026-08-01', '2026-08-02', '2026-08-03', '2026-08-04', '2026-08-05',
  '2026-08-06', '2026-08-07',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Lundi = 0
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const reservedSet = new Set(RESERVED_DATES);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayMidnight;
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(currentYear, currentMonth, day);
    const isReserved = reservedSet.has(dateStr);
    const past = isPast(day);

    let cellClass = 'h-10 w-10 flex items-center justify-center rounded-md text-sm font-medium ';
    if (past) {
      cellClass += 'text-gray-300';
    } else if (isReserved) {
      cellClass += 'bg-red-100 text-red-600 line-through';
    } else {
      cellClass += 'bg-green-100 text-green-700';
    }

    cells.push(
      <div key={day} className={cellClass} title={isReserved ? 'Réservé' : 'Disponible'}>
        {day}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
          aria-label="Mois précédent"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold text-amber-900">
          {MOIS[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
          aria-label="Mois suivant"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {JOURS.map((j) => (
          <div key={j} className="h-8 flex items-center justify-center text-xs font-semibold text-gray-500">
            {j}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{cells}</div>

      <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-green-100 border border-green-300" />
          Disponible
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-red-100 border border-red-300" />
          Réservé
        </span>
      </div>
    </div>
  );
}
