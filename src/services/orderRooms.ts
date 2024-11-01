import { IRooms } from "@/interfaces/IRooms";

function parseRoom(room: string): { id: number, sufix: string } {
    const match = room.match(/^(\d+)([A-Z]*)$/);
    if (match) {
        return {
            id: parseInt(match[1], 10),
            sufix: match[2]
        };
    }

    return {
        id: parseInt(room, 10),
        sufix: ""
    };
}

export default function orderRooms(array: IRooms[], type: string = "asc"): IRooms[] {
    return array.sort((a, b) => {
        const roomA = parseRoom(a.sala);
        const roomB = parseRoom(b.sala);

        if (roomA.id === roomB.id) {
            if (roomA.sufix < roomB.sufix) {
                return type === "asc" ? -1 : 1;
            } else if (roomA.sufix > roomB.sufix) {
                return type === "asc" ? 1 : -1;
            } else {
                return 0;
            }
        } else {
            return type === "asc" ? roomA.id - roomB.id : roomB.id - roomA.id;
        }
    });
}