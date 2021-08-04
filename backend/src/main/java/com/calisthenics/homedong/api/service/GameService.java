package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.response.GameStartRes;
import com.calisthenics.homedong.db.entity.Game;
import com.calisthenics.homedong.db.entity.Room;
import com.calisthenics.homedong.db.repository.GameRepository;
import com.calisthenics.homedong.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Service
public class GameService {
    private final GameRepository gameRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public GameService(GameRepository gameRepository, RoomRepository roomRepository) {
        this.gameRepository = gameRepository;
        this.roomRepository = roomRepository;
    }

    @Transactional
    public GameStartRes startGame(String roomId) {
        Room room = roomRepository.findByRoomId(roomId);

        room.setStatus("GAME");

        roomRepository.save(room);

        Game game = Game.builder()
                .room(room)
                .build();

        gameRepository.save(game);

        return new GameStartRes(game.getGameId());
    }
}
