package com.smartparking.dto;

import java.util.List;

public class FloorDTO {
    private Long id;
    private String floorName;
    private Integer level;
    private List<SlotDTO> slots;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getFloorName() {
        return this.floorName;
    }
    public void setFloorName(String floorName) {
        this.floorName = floorName;
    }

    public Integer getLevel() {
        return this.level;
    }
    public void setLevel(Integer level) {
        this.level = level;
    }

    public List<SlotDTO> getSlots() {
        return this.slots;
    }
    public void setSlots(List<SlotDTO> slots) {
        this.slots = slots;
    }
}
