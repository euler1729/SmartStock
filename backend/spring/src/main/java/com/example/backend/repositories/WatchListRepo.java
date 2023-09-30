package com.example.backend.repositories;

import com.example.backend.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchListRepo extends JpaRepository<WatchList, Integer> {
    @Query("SELECT symbol FROM WatchList WHERE uid = ?1")
    List<String> findByUid(int uid);
}
