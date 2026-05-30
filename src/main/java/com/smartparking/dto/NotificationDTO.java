package com.smartparking.dto;

import java.time.LocalDateTime;

public class NotificationDTO {
    private Long id;
    private String title;
    private String message;
    private String type;
    private String priority;
    private String iconType;
    private String actionUrl;
    private Boolean isRead;
    private LocalDateTime createdAt;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return this.message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return this.type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getPriority() {
        return this.priority;
    }
    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getIconType() {
        return this.iconType;
    }
    public void setIconType(String iconType) {
        this.iconType = iconType;
    }

    public String getActionUrl() {
        return this.actionUrl;
    }
    public void setActionUrl(String actionUrl) {
        this.actionUrl = actionUrl;
    }

    public Boolean getIsRead() {
        return this.isRead;
    }
    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public Boolean getRead() {
        return this.isRead;
    }
    public void setRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
