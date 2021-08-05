package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.request.GameEndReq;
import com.calisthenics.homedong.api.response.BadgeRes;
import com.calisthenics.homedong.api.response.GameStartRes;
import com.calisthenics.homedong.db.entity.Entry;
import com.calisthenics.homedong.db.entity.Game;
import com.calisthenics.homedong.db.entity.Room;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.db.repository.EntryRepositry;
import com.calisthenics.homedong.db.repository.GameRepository;
import com.calisthenics.homedong.db.repository.RoomRepository;
import com.calisthenics.homedong.db.repository.UserRepository;
import com.calisthenics.homedong.error.exception.custom.UserNotFoundException;
import com.calisthenics.homedong.util.SecurityUtil;
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
    private final UserRepository userRepository;
    private final EntryRepositry entryRepositry;
    private final RecordService recordService;

    @Autowired
    public GameService(GameRepository gameRepository, RoomRepository roomRepository,
                       UserRepository userRepository, EntryRepositry entryRepositry, RecordService recordService) {
        this.gameRepository = gameRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
        this.entryRepositry = entryRepositry;
        this.recordService = recordService;
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

    public BadgeRes endGame(GameEndReq gameEndReq) {
        User user = SecurityUtil.getCurrentEmail().flatMap(userRepository::findOneWithRolesByEmail).orElse(null);

        if(user == null) {
            throw new UserNotFoundException(SecurityUtil.getCurrentEmail().orElse(""));
        }

        BadgeRes previousBadgeRes = recordService.getBadgeRecord();

        Game game = gameRepository.findById(gameEndReq.getGameId()).orElse(null);

        Room room = game.getRoom();
        room.setStatus("ON");
        roomRepository.save(room);

        Entry entry = Entry.builder()
                .game(game)
                .userId(user.getUserId())
                .count(gameEndReq.getCount())
                .build();
        entryRepositry.save(entry);

        BadgeRes currentBadgeRes = recordService.getBadgeRecord();

        BadgeRes gameBadgeRes = new BadgeRes();

        if(currentBadgeRes.getSquat().isBeginner() && !previousBadgeRes.getSquat().isBeginner()) {
            gameBadgeRes.getSquat().setBeginner(true);
        }
        if(currentBadgeRes.getSquat().isIntermediate() && !previousBadgeRes.getSquat().isIntermediate()) {
            gameBadgeRes.getSquat().setIntermediate(true);
        }
        if(currentBadgeRes.getSquat().isAdvanced() && !previousBadgeRes.getSquat().isAdvanced()) {
            gameBadgeRes.getSquat().setAdvanced(true);
        }

        if(currentBadgeRes.getSitUp().isBeginner() && !previousBadgeRes.getSitUp().isBeginner()) {
            gameBadgeRes.getSitUp().setBeginner(true);
        }
        if(currentBadgeRes.getSitUp().isIntermediate() && !previousBadgeRes.getSitUp().isIntermediate()) {
            gameBadgeRes.getSitUp().setIntermediate(true);
        }
        if(currentBadgeRes.getSitUp().isAdvanced() && !previousBadgeRes.getSitUp().isAdvanced()) {
            gameBadgeRes.getSitUp().setAdvanced(true);
        }

        if(currentBadgeRes.getPushUp().isBeginner() && !previousBadgeRes.getPushUp().isBeginner()) {
            gameBadgeRes.getPushUp().setBeginner(true);
        }
        if(currentBadgeRes.getPushUp().isIntermediate() && !previousBadgeRes.getPushUp().isIntermediate()) {
            gameBadgeRes.getPushUp().setIntermediate(true);
        }
        if(currentBadgeRes.getPushUp().isAdvanced() && !previousBadgeRes.getPushUp().isAdvanced()) {
            gameBadgeRes.getPushUp().setAdvanced(true);
        }

        if(currentBadgeRes.isHomedongKing() && !previousBadgeRes.isHomedongKing()) {
            gameBadgeRes.setHomedongKing(true);
        }

        return gameBadgeRes;
    }

}
