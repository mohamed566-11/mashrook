using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Models;

namespace Masroo3k.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users => Set<User>();
        public DbSet<Analysis> Analyses => Set<Analysis>();
        public DbSet<Template> Templates => Set<Template>();
        public DbSet<TemplateField> TemplateFields => Set<TemplateField>();
        public DbSet<ActivityLog> ActivityLogs => Set<ActivityLog>();
        public DbSet<Notification> Notifications => Set<Notification>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Analysis>()
                .HasOne(a => a.Owner)
                .WithMany(u => u.Analyses)
                .HasForeignKey(a => a.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Analysis>()
                .HasOne(a => a.Template)
                .WithMany(t => t.Analyses)
                .HasForeignKey(a => a.TemplateId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Analysis>()
                .Property(a => a.Investment)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Analysis>()
                .Property(a => a.ExpectedROI)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<ActivityLog>()
                .HasOne(al => al.User)
                .WithMany()
                .HasForeignKey(al => al.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<ActivityLog>()
                .HasIndex(al => al.CreatedAt);

            modelBuilder.Entity<ActivityLog>()
                .HasIndex(al => al.Action);

            modelBuilder.Entity<ActivityLog>()
                .HasIndex(al => al.Severity);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany()
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Notification>()
                .HasIndex(n => n.CreatedAt);

            modelBuilder.Entity<Notification>()
                .HasIndex(n => n.IsRead);

            // TemplateField relationships
            modelBuilder.Entity<TemplateField>()
                .HasOne(tf => tf.Template)
                .WithMany(t => t.Fields)
                .HasForeignKey(tf => tf.TemplateId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TemplateField>()
                .HasIndex(tf => new { tf.TemplateId, tf.StageNumber, tf.FieldOrder });
        }
    }
}