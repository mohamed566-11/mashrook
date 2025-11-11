using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Masroo3k.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateSQLServer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InitialCreateSQLServer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "InitialCreateSQLServer", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "InitialCreateSQLServer", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "InitialCreateSQLServer", maxLength: 280, nullable: true),
                    Category = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    Duration = table.Column<int>(type: "InitialCreateSQLServer", nullable: false),
                    IsPopular = table.Column<bool>(type: "InitialCreateSQLServer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "InitialCreateSQLServer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("InitialCreateSQLServer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InitialCreateSQLServer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "InitialCreateSQLServer", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    Email = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    PasswordHash = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    Role = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "InitialCreateSQLServer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("InitialCreateSQLServer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TemplateFields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "InitialCreateSQLServer", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TemplateId = table.Column<int>(type: "InitialCreateSQLServer", nullable: false),
                    StageNumber = table.Column<int>(type: "InitialCreateSQLServer", nullable: false),
                    FieldOrder = table.Column<int>(type: "InitialCreateSQLServer", nullable: false),
                    Label = table.Column<string>(type: "InitialCreateSQLServer", maxLength: 100, nullable: false),
                    InputType = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    FieldOptions = table.Column<string>(type: "InitialCreateSQLServer", nullable: true),
                    Rationale = table.Column<string>(type: "InitialCreateSQLServer", maxLength: 1000, nullable: false),
                    IsRequired = table.Column<bool>(type: "InitialCreateSQLServer", nullable: false),
                    MinLength = table.Column<int>(type: "InitialCreateSQLServer", nullable: true),
                    MaxLength = table.Column<int>(type: "InitialCreateSQLServer", nullable: true),
                    MustBePositive = table.Column<bool>(type: "InitialCreateSQLServer", nullable: false),
                    MustBeValidUrl = table.Column<bool>(type: "InitialCreateSQLServer", nullable: false),
                    MustBeBetween0And100 = table.Column<bool>(type: "InitialCreateSQLServer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "InitialCreateSQLServer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("InitialCreateSQLServer", x => x.Id);
                    table.ForeignKey(
                        name: "InitialCreateSQLServer",
                        column: x => x.TemplateId,
                        principalTable: "InitialCreateSQLServer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "InitialCreateSQLServer", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Action = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    EntityType = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    EntityId = table.Column<int>(type: "InitialCreateSQLServer", nullable: true),
                    Description = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    Details = table.Column<string>(type: "InitialCreateSQLServer", nullable: true),
                    IpAddress = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    UserAgent = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "InitialCreateSQLServer", nullable: false),
                    Severity = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    UserId = table.Column<int>(type: "InitialCreateSQLServer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("InitialCreateSQLServer", x => x.Id);
                    table.ForeignKey(
                        name: "InitialCreateSQLServer",
                        column: x => x.UserId,
                        principalTable: "InitialCreateSQLServer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "InitialCreateSQLServer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "InitialCreateSQLServer", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    Content = table.Column<string>(type: "InitialCreateSQLServer", nullable: true),
                    Score = table.Column<int>(type: "InitialCreateSQLServer", nullable: false),
                    RiskLevel = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    SuccessPercent = table.Column<int>(type: "InitialCreateSQLServer", nullable: false),
                    Investment = table.Column<decimal>(type: "InitialCreateSQLServer", nullable: false),
                    ExpectedROI = table.Column<decimal>(type: "InitialCreateSQLServer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "InitialCreateSQLServer", nullable: false),
                    ExecutiveSummary = table.Column<string>(type: "InitialCreateSQLServer", nullable: true),
                    KeyFindings = table.Column<string>(type: "InitialCreateSQLServer", nullable: true),
                    Recommendations = table.Column<string>(type: "InitialCreateSQLServer", nullable: true),
                    OwnerId = table.Column<int>(type: "InitialCreateSQLServer", nullable: false),
                    TemplateId = table.Column<int>(type: "InitialCreateSQLServer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("InitialCreateSQLServer", x => x.Id);
                    table.ForeignKey(
                        name: "InitialCreateSQLServer",
                        column: x => x.TemplateId,
                        principalTable: "InitialCreateSQLServer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "InitialCreateSQLServer",
                        column: x => x.OwnerId,
                        principalTable: "InitialCreateSQLServer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InitialCreateSQLServer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "InitialCreateSQLServer", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "InitialCreateSQLServer", nullable: false),
                    Title = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    Message = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    Type = table.Column<string>(type: "InitialCreateSQLServer", nullable: false),
                    IsRead = table.Column<bool>(type: "InitialCreateSQLServer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "InitialCreateSQLServer", nullable: false),
                    ActionUrl = table.Column<string>(type: "InitialCreateSQLServer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("InitialCreateSQLServer", x => x.Id);
                    table.ForeignKey(
                        name: "InitialCreateSQLServer",
                        column: x => x.UserId,
                        principalTable: "InitialCreateSQLServer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "ActivityLogs",
                column: "InitialCreateSQLServer");

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "ActivityLogs",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "ActivityLogs",
                column: "InitialCreateSQLServer");

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "ActivityLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "InitialCreateSQLServer",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "InitialCreateSQLServer",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "InitialCreateSQLServer",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "InitialCreateSQLServer",
                column: "IsRead");

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "InitialCreateSQLServer",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "TemplateFields",
                columns: new[] { "TemplateId", "StageNumber", "FieldOrder" });

            migrationBuilder.CreateIndex(
                name: "InitialCreateSQLServer",
                table: "InitialCreateSQLServer",
                column: "InitialCreateSQLServer",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityLogs");

            migrationBuilder.DropTable(
                name: "InitialCreateSQLServer");

            migrationBuilder.DropTable(
                name: "InitialCreateSQLServer");

            migrationBuilder.DropTable(
                name: "TemplateFields");

            migrationBuilder.DropTable(
                name: "InitialCreateSQLServer");

            migrationBuilder.DropTable(
                name: "InitialCreateSQLServer");
        }
    }
}
